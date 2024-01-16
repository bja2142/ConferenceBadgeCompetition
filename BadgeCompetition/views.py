from flask import render_template, request, send_file, make_response
from BadgeCompetition import app
from BadgeCompetition.db import query_db

@app.route("/", methods = ["GET"])
def index():
    return render_template('index.html',query="")

@app.route('/search', methods = ["GET"])
def handle_search():
  query = request.args.get("query", "").lower()
  error =""
  movies = False
  try:
    result = query_db(app,"SELECT title,year,description FROM movies WHERE year >0 AND LOWER(title) LIKE '%{}%'".format(query))
    movies = []
    for movie in result:
      movies.append(movie)
  except Exception as err:
    print(err,flush=True)
    error = str(err)
  return render_template('index.html', movies=movies, query=query, error=error)



@app.route('/db.py', methods = ['GET'])
def view_source():
  return send_file("db.py")

@app.route('/views.py', methods = ['GET'])
def view_source2():
  return send_file("views.py")

@app.route('/schema.sql', methods = ['GET'])
def view_other_source():
  return send_file("schema.sql")
