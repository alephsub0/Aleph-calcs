import pytest

from app.app import app


@pytest.fixture()
def client():
    app.config.update(TESTING=True)
    return app.test_client()


@pytest.mark.parametrize(
    ('route', 'expected_text', 'page_script'),
    (
        ('/', 'Calculadora de probabilidades', None),
        ('/binomial', 'Distribución Binomial', 'binomial.js'),
        ('/poisson', 'Distribución de Poisson', 'poisson.js'),
        ('/exponencial', 'Distribución Exponencial', 'exponencial.js'),
    ),
)
def test_main_routes_render_expected_page(
        client, route, expected_text, page_script):
    response = client.get(route)

    assert response.status_code == 200
    assert expected_text.encode() in response.data
    if page_script:
        assert b'js/distribution.js' in response.data
        assert page_script.encode() in response.data


@pytest.mark.parametrize(
    'asset',
    (
        'css/base.css',
        'js/distribution.js',
        'js/binomial.js',
        'js/poisson.js',
        'js/exponencial.js',
    ),
)
def test_static_assets_are_available(client, asset):
    response = client.get(f'/static/{asset}')

    assert response.status_code == 200
    assert response.data


def test_unknown_route_returns_not_found(client):
    response = client.get('/no-existe')

    assert response.status_code == 404
