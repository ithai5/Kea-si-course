
from fastapi import FastAPI, File, UploadFile
import json

import xmltodict

app = FastAPI()

@app.post("/upload-file")
async def create_upload_file(file: UploadFile):
    print("upload file",  file.content_type)
    file_type = file.content_type
    if file_type == "text/xml":
        return xmltodict.parse(file.file)
    elif file_type == "application/json":
        return json.load(file.file)
    else:
        return {"message": "unknown type"}