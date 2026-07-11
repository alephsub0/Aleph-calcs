from app.app import app


def test_main_routes_render_successfully():
    client = app.test_client()

    for route in ('/', '/binomial', '/poisson', '/exponencial'):
        response = client.get(route)

        assert response.status_code == 200
