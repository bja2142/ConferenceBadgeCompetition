from flask import Flask, request, flash, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from secrets import token_urlsafe
from sqlalchemy.sql import func
from json import loads
import os

from BadgeCompetition.models import (
            Badge,
            Tag
        )


SQL_DATABASE = os.environ.get("DATABASE_URL",'sqlite:///db.sqlite3')
SECRET_KEY = token_urlsafe(32)

"""@app.route('/new', methods = ['GET', 'POST'])
def new():
   if request.method == 'POST':
      if not request.form['name'] or not request.form['city'] or not request.form['addr']:
         flash('Please enter all the fields', 'error')
      else:
         student = students(request.form['name'], request.form['city'],
            request.form['addr'], request.form['pin'])
         
         db.session.add(student)
         db.session.commit()
         flash('Record was successfully added')
         return redirect(url_for('show_all'))
   return render_template('new.html')
"""

def load_initial_data(app):
    try:
        with open("badges.json", "r") as f:
            data = f.read()
    except Exception as e:
        print("Failed to import default data:", str(e))
        return
    data = loads(data)
    for badge in data:
        new_badge = Badge(
                token = badge["token"],
                nickname = badge["nickname"],
                value = badge["value"]
                )
        app.db.session.add(new_badge)
        try:
            app.db.session.commit()
        except:
            continue
        print("Adding badge:", badge)

def create_app():
    app = Flask(__name__)
    with app.app_context():
        app.config['SQLALCHEMY_DATABASE_URI'] = SQL_DATABASE
        app.config['SECRET_KEY'] = SECRET_KEY

        from BadgeCompetition.models import (
            db
        )
        db.init_app(app)

        db.create_all()
        app.db = db
        load_initial_data(app)
        from BadgeCompetition.routes import pages
        app.register_blueprint(pages)
        #app.run(debug = True)
        return app

if __name__ == '__main__':
    create_app()
