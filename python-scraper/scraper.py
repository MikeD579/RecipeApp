import sys
import json
from recipe_scrapers import scrape_me

def get_recipe(url):
    try:
        # Initialize the scraper
        scraper = scrape_me(url)
        
        # Package the data into a dictionary
        data = {
            "title": scraper.title(),
            "total_time": scraper.total_time(),
            "yields": scraper.yields(),
            "ingredients": scraper.ingredients(),
            "instructions": scraper.instructions(),
            "image": scraper.image(),
            "host": scraper.host(),
        }
        
        # Print only the JSON to stdout
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_recipe(sys.argv[1])
    else:
        print(json.dumps({"error": "No URL provided"}), file=sys.stderr)
        sys.exit(1)