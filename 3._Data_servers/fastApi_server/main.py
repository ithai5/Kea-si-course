from fastapi import FastAPI, Request
from datetime import datetime, timezone
import requests
import json 

app=FastAPI()

@app.get("/timestamp")
def date_authority():
    return {"time": datetime.now(timezone.utc).isoformat().replace("+00:00","Z")}

@app.get("/express/time")
async def date_in_express(): 
    res =  requests.get("http://localhost:4200/timestamp")
    result = json.loads(res.text)
    return  {"message": result}