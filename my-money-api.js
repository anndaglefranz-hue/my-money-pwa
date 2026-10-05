const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQtcGOcmKW08hw1gC6JQtg8kSPgpifMNiuCZqCWm8i5ivFiIK70JBfPgvdQnZVPY7u/exec";

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify({ ok: false, error: 'Method not allowed.' })
    };
  }

  try {
    const body = event.body || '{}';

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
      redirect: 'follow'
    });

    const text = await response.text();

    let payload;
    try {
      payload = JSON.parse(text);
    } catch (error) {
      payload = {
        ok: false,
        error: 'Apps Script returned an invalid response.'
      };
    }

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify(payload)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify({
        ok: false,
        error: error && error.message
          ? error.message
          : 'Unable to reach My Money server.'
      })
    };
  }
};
