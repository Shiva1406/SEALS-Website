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

        # Extract video IDs from search results
        video_ids = [item["id"]["videoId"] for item in youtube_response.get("items", [])]

        # Fetch additional video details (views, likes, duration)
        if video_ids:
            details_response = youtube.videos().list(
                part="snippet,statistics,contentDetails",  # ✅ Added "contentDetails" to get duration
                id=",".join(video_ids)
            ).execute()
        else:
            details_response = {"items": []}

        # Map video ID to details
        video_details = {item["id"]: item for item in details_response.get("items", [])}

        # Process the results
        videos = [
            {
                "id": item["id"]["videoId"],
                "title": item["snippet"]["title"],
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
                "publishedAt": item["snippet"]["publishedAt"],
                "rating": video_details.get(item["id"]["videoId"], {}).get("statistics", {}).get("likeCount", "N/A"),
                "views": video_details.get(item["id"]["videoId"], {}).get("statistics", {}).get("viewCount", "N/A"),
                "duration": video_details.get(item["id"]["videoId"], {}).get("contentDetails", {}).get("duration", "N/A")  # ✅ Fetching duration
            }
            for item in youtube_response.get("items", [])
        ]


        return jsonify(videos)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
