from fastapi import FastAPI
from datetime import datetime, timezone

app=FastAPI()

@app.get("/timestamp")
def date_authority():
    return {"time": datetime.now(timezone.utc).isoformat().replace("+00:00","Z")}