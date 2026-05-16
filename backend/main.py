import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title='Signal Atelier API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:5173', 'http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

DATA_FILE = Path(__file__).with_name('portfolio_content.json')


def load_portfolio_payload() -> dict[str, object]:
    with DATA_FILE.open('r', encoding='utf-8') as handle:
        return json.load(handle)


class ContactForm(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    message: str = Field(min_length=10, max_length=1000)


@app.get('/api/health')
def health_check() -> dict[str, str]:
    return {'status': 'ok'}


@app.get('/api/profile')
def get_profile() -> dict[str, object]:
    return load_portfolio_payload()


@app.post('/api/contact')
def submit_contact(form: ContactForm) -> dict[str, str]:
    if not form.name.strip() or not form.message.strip():
        raise HTTPException(status_code=400, detail='Name and message are required.')

    return {
        'status': 'received',
        'message': f'Thanks {form.name.strip()}. Your message is queued for a human reply.'
    }