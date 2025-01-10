from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from googleapiclient.discovery import build

app = Flask(__name__)
CORS(app)

# Set up YouTube API client
API_KEY = os.environ.get("GOOGLE_API_KEY")
youtube = build('youtube', 'v3', developerKey=API_KEY)

@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.args.get("query")  # Use JSON body for the query in POST request
    if not query:
        return jsonify({"error": "Query is required"}), 400
    print(query)

    try:
        print(API_KEY)
        # Fetch search results from YouTube API
        youtube_response = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            maxResults=10,
            order="relevance"
        ).execute()

        # Process the results
        videos = [
            {
                "id": item["id"]["videoId"],
                "title": item["snippet"]["title"],
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"]
            }
            for item in youtube_response.get("items", [])
        ]

        return jsonify(videos)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
