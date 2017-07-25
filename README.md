# CodeAlert

Slack/Email/Sound alert when your code block finishes running.

## Requirements

Python 2/3

## Installation 

- **Using `pip`:** ```pip install codealert```

- **Manually:** Download `python/codealert/` folder, and import it in your Python project.

## Usage

Check out `python/CodeAlert.ipynb` for working examples.

### Setup and configuration
```
# Import after pip install codealert
from codealert import *

# Initialize
codealert = CodeAlert()

# Easy way to turn it on/off
codealert.set('on', True)

# Method chaining way to set attributes. Sound and email is enabled but Slack is not.
codealert.set('sound_enabled', True).set('email_enabled', True).set('emails', ['YOUR_EMAIL'])
```

List of attributes:
- `on`: `bool`
- `sound_enabled`: `bool` or a `str` indicating the sound you want to be played, i.e. passing in `done` will invoke a terminal sound saying done.
- `email_enabled`: `bool`
- `emails`: `[]` array of string emails to send to
- `slack_enabled`: `bool`
- `slack_urls`: `[]` array of slack urls to send to. Please obtain your slack urls from https://my.slack.com/services/new/incoming-webhook/
- `logtext`: `str` default log text that is sent to your email/Slack. If `ping` is being called with a `str` argument passed in, that will override `logtext`. `print` statements in a `pingd` decorated function will also override `logtext`.

### In-line alerts

```
# Start Code block
import time
time.sleep(3)
# End Code block

# One line ping here that will send you an email and emit a sound
codealert.ping('Finished sleeping for 3 seconds')
```

If you want to enable Slack, you'll have to reconfigure your `codealert` instance:

```
slack_urls = ['https://hooks.slack.com/services/T---/B---/---']
codealert.set('slack_enabled', True).set('slack_urls', slack_urls)
```

Then ping to send you a notification in Slack:

```
import time
time.sleep(1)

codealert.ping("CodeAlert pinging Slack after 1 second")
```

### Decorate functions

`pingd(codealert, options)` decorator that takes in two optional arguments: `codealert` instance and `options` which is a dictionary of attributes that applies only to this function. If `codealert` is not passed in, a new `codealert` instance will be initialised. If `options` is not passed in, options set in `codealert` will be used.

**Note:** `options` does not mutate `codealert` instance passed in.

```
custom_options = {'email_enabled': False, 'sound_enabled': 'done', 'slack_enabled': True}

# Pass in code alert and custom options
@pingd(codealert, custom_options)
def func(a, b, c):
    import time
    time.sleep(3)
    
# Test call function
func('a', 'b', 'c')
```

This will send you a Slack notification and play a sound after the end of the function execution.

Decorated functions also sends you the ping **whenever an error happens in the function**. Furthermore, all `print` statements in a function will be forwarded to you, along with the error invoked:

```
# 
@pingd(codealert)
def func_error():
    import time
    time.sleep(3)
    print('This code is before the error')
    x = None + 2
    print('This code does not print')
    
# Test call function
func_error()
```

The above function when called will send to your Slack the following message: 

```
Error:
======
unsupported operand type(s) for +: 'NoneType' and 'int'

Print:
======
This code is before the error
```

### Important things to note when using

- I have hosted a small server to handle email notifications. Hence if you are using email notifications, please do not spam my server, i.e. do not place a `ping()` call inside a `for` loop. Violation of this will result in me banning your usage of the server for email notifications permanently.

## For open source contributors

- Please commit to a separate branch and submit a pull request.
- If you run your own node.js server, remember to change the `BASE_URL` in `CodeAlert.py` to your server's host and port.
- If you want to run email alerts, you have to create a `credentials.txt` in the root directory of your node.js app. The first line of the file will be your email address, and the second line being your email pass, i.e.

```
abc@gmail.com
abc123
```
