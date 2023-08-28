from flask import jsonify
import requests

def crypto_info(coin_id):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin_id}&vs_currencies=usd&include_market_cap=true"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)
