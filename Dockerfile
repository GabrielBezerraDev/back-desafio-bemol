FROM ollama/ollama:latest

ENTRYPOINT [ "sh", "-c" ]
CMD ["ollama serve & sleep 2 && wait"]
 