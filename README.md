# CodeAlert
Email/sound alert when your code block finishes running. This will be updated to include Telegram/Slack alerts in the future.

**How to use:**

- Download `CodeAlertLib.zip`, unzip it, and import in your python project. This works on both Python 2/3. 
- Upon download, check out `CodeAlert.ipynb` for working examples.
- **Warning: Do not run too many concurrent email requests, i.e. NEVER place ping inside a for loop.**

**For open source contributors:**

- Please commit to a separate branch and submit a pull request
- If you run your own node.js server, you have to create a `credentials.txt` in root directory. The first line of the file will be your email address, and the second line being your email pass, i.e.

```
abc@gmail.com
abc123
```

- Also remember to change the `BASE_URL` in `CodeAlert.py` in `CodeAlertLib` to your server's host and port 
- Sound does not work on Windows unless you enable command prompt sounds. The default sound in Mac uses Glass.aiff present in `/System/Library/Sounds/Glass.aiff`.
