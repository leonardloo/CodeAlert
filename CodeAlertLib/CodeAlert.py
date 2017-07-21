class CodeAlert:
    
    # Used for method chaining
    def set(self, option, val):
        if option == 'sound_enabled':
            if isinstance(val, bool):
                self.SOUND_ENABLED = val
            elif isinstance(val, str):
                self.SOUND_ENABLED = True
                self.SOUND_WORD = val
        elif option == 'email_enabled':
            if isinstance(val, bool):
                self.EMAIL_ENABLED = val
        elif option == 'emails':
            if isinstance(val, list):
                for v in val:
                    if not isinstance(v, str):
                        return self
                self.emails = val
        elif option == 'on':
            if isinstance(val, bool):
                self.ENABLED = val
        elif option == 'logtext':
            if isinstance(val, str):
                self.logtext = val
        return self
        
    def __init__(self):
        self.ENABLED = True
        self.SOUND_ENABLED = False
        self.SOUND_WORD = ""
        self.EMAIL_ENABLED = True
        self.emails = []
        self.logtext = "Your code has finished running!"
        
    def options(self):
        return {'on': self.ENABLED, 'sound_enabled': self.SOUND_ENABLED, 
                'email_enabled': self.EMAIL_ENABLED, 'emails': self.emails, 'logtext': self.logtext}
    
    def set_options(self, options):
        if 'on' in options:
            self.ENABLED = options['on']
        if 'sound_enabled' in options:
            val = options['sound_enabled']
            if isinstance(val, bool):
                self.SOUND_ENABLED = val
            elif isinstance(val, str):
                self.SOUND_ENABLED = True
                self.SOUND_WORD = val
        if 'email_enabled' in options:
            self.EMAIL_ENABLED = options['email_enabled']
        if 'emails' in options:
            self.emails = options['emails']
        if 'logtext' in options:
            self.logtext = options['logtext']
    
    def ping(self, logtxt=""):
        import os
        import requests
        import json
        
        if not self.ENABLED:
            return
        
        if self.EMAIL_ENABLED:
            if len(self.emails) == 0:
                print('Please enter recipient emails for ping')
                return
            base_url = 'http://52.207.228.129:3001'
            email_url = 'email'
            final_url="{0}/{1}".format(base_url,email_url)
            for email in self.emails:
                logtext_to_use = self.logtext if not logtxt else logtxt
                payload = {'email': email, 'logtext': logtext_to_use}
                headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
                response = requests.post(final_url, headers=headers, data=json.dumps(payload))
                
        if self.SOUND_ENABLED:
            try: # Mac
                if self.SOUND_WORD:
                    os.system('say "' + self.SOUND_WORD + '"')
                else:
                    os.system('afplay ./Glass.aiff')
            except: # Windows (Might not work)
                print('\a')
     
# Ping decorator
def pingd(calert, options):
    import copy
    _calert = copy.copy(calert)
    _calert.set_options(options)
    def ping_decorator(func):
        def func_wrapper(*args, **kwargs):
            try:
                func(*args, **kwargs)
                _calert.ping()
            except Exception as e:
                _calert.ping('Error: ' + str(e))
        return func_wrapper
    return ping_decorator
