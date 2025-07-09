from flask import Flask, render_template, url_for, request

app = Flask(__name__)

# Updated product data for the shop page with correct image paths and names
products = [
    {"id": 1, "name": "Creamy Yogurt Delight", "price": "₹120", "image": "yogurt.jpg", "description": "Smooth and creamy yogurt, perfect for a light snack."},
    {"id": 2, "name": "White Cream Dessert", "price": "₹180", "image": "white cream.jpg", "description": "Decadent white cream dessert, a sweet escape."},
    {"id": 3, "name": "Chocolate Cream Puff", "price": "₹220", "image": "choclate cream.webp", "description": "Delicious chocolate cream puffs, a delightful treat."},
]

@app.route('/')
def home():
    video_sections_data = [
        {"id": "ice_cream_section", "video": "ice.mp4", "text_left": "Happiness is just", "text_right": "a bite of chocolate away.", "background_color": "#4A2C2A"},
        {"id": "apple_section", "video": "apple.mp4", "text_left": "Good vibes begin", "text_right": "with good yogurt.", "background_color": "#CD2B3F"},
        {"id": "choco_section", "video": "choco.mp4", "text_left": "Two ingredients.<br>One unforgettable taste.", "text_right": "Walnuts & Milk Chocolate.", "background_color": "#4A2C2A"},
        {"id": "berry_section", "video": "berry.mp4", "text_left": "Yogurt & Berries", "text_right": "The Duo Your Taste Buds Deserve.", "background_color": "#5D3E8E"},
        {"id": "biscuit_section", "video": "biscuit.mp4", "text_left": "Turning Every Bite", "text_right": "Into a Beautiful Moment.", "background_color": "#1A1A1A"},
    ]
    return render_template('home.html', video_sections_data=video_sections_data)

@app.route('/shop')
def shop():
    return render_template('shop.html', products=products)

@app.route('/about')
def about():
    contact_info = {
        "address": "123 Indiranagar Main Road, Bengaluru, Karnataka 560038",
        "email": "info@sweetdelights.com",
        "phone": "+91 98765 43210"
    }
    social_media = {
        "facebook": "https://www.facebook.com/sweetdelights",
        "instagram": "https://www.instagram.com/sweetdelights",
        "twitter": "https://www.twitter.com/sweetdelights"
    }
    Maps_embed_url = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.00336060195!2d77.63385737482329!3d12.97194098735399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1642c38d4b31%3A0xf607a78e7c1d1a1b!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" # Example valid embed URL
    return render_template('about.html', contact_info=contact_info, social_media=social_media, Maps_embed_url=Maps_embed_url)

if __name__ == '__main__':
    app.run(debug=True)