from app.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128))

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question = db.Column(db.Text)
    reply = db.Column(db.Text)
    timestamp = db.Column(db.DateTime)

class Itinerary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    data = db.Column(db.JSON)
    updated_at = db.Column(db.DateTime)

class Checklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    destination = db.Column(db.String(100))
    items = db.Column(db.JSON)

class CultureInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(100))
    city = db.Column(db.String(100))
    culture_text = db.Column(db.Text)
    emergency_contacts = db.Column(db.JSON)

class Phrase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language_code = db.Column(db.String(10))
    phrase = db.Column(db.String(255))
    translation = db.Column(db.String(255))