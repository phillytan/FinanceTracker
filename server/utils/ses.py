import pandas as pd
import sys
if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO

from statsmodels.tsa.api import SimpleExpSmoothing

TESTDATA = StringIO(sys.argv[1])
def ses (TESTDATA):
    df = pd.read_csv(TESTDATA, sep=",")

    alpha = 0.8

    ses_fit = SimpleExpSmoothing(df, initialization_method="estimated").fit(
    smoothing_level=alpha, optimized=False
)
    ses_forecast = ses_fit.forecast(1)

    print(ses_forecast[ses_forecast.keys()[0]])
    sys.stdout.flush()
ses(TESTDATA)