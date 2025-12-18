import requests
import os

assets = [
    {
        "url": "https://adapty.io/assets/uploads/2023/12/adapty-logo-color.svg",
        "path": "/Users/kirniy/dev/adapty-pt2/public/logos/adapty-logo-color.svg"
    },
    {
        "url": "https://adapty.io/assets/uploads/2023/12/adapty-logo-black.svg", 
        # Guessing this URL based on naming convention, if fail, we use color
        "path": "/Users/kirniy/dev/adapty-pt2/public/logos/adapty-logo-black.svg"
    }
]

for asset in assets:
    try:
        r = requests.get(asset["url"])
        if r.status_code == 200:
            with open(asset["path"], 'wb') as f:
                f.write(r.content)
            print(f"Downloaded: {asset['path']}")
        else:
            print(f"Failed to download {asset['url']}: Status {r.status_code}")
    except Exception as e:
        print(f"Error downloading {asset['url']}: {e}")
