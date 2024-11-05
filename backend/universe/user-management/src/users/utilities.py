import string
import random
from django.core.mail import send_mail

class Utilities:
    @staticmethod
    def generate_random_password(length=12):
        """
        Generates a secure, random password containing a mix of uppercase, lowercase, digits, and special characters.
        
        Parameters:
            length (int): The length of the password to generate.
        
        Returns:
            str: A secure password that meets the complexity requirements.
        """
        characters = string.ascii_letters + string.digits + string.punctuation
        password = ''.join(random.choice(characters) for _ in range(length))
        
        # Check that the password contains at least one of each required character type
        if (any(c.islower() for c in password) and
            any(c.isupper() for c in password) and
            any(c.isdigit() for c in password) and
            any(c in string.punctuation for c in password)):
            return password
        else:
            # Retry if password doesn't meet criteria
            return Utilities.generate_random_password(length)
    @staticmethod
    def send_email(email, subject, message):
        """
        Sends an email to the specified recipient.
        
        Parameters:
            email (str): The recipient's email address.
            subject (str): The subject of the email.
            message (str): The body of the email.
        """
        # Implementation of email sending logic
        send_mail(
            subject,
            message,
            email,
            fail_silently=False,
        )
        pass


