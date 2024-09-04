from flask import Flask, render_template, request

app = Flask(__name__)

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# Calculadora binomial
@app.route('/binomial')
def binomial():
    return render_template('binomial.html')

# Calculadora poisson
@app.route('/poisson')
def poisson():
    return render_template('poisson.html')

if __name__ == '__main__':
    app.run(debug=True)