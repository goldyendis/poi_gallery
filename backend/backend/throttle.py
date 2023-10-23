from rest_framework.throttling import AnonRateThrottle

class AnonymousThrottle(AnonRateThrottle):
    rate = '120/minute'