  function reInvalid(req,res) {
    res.status(400).send({ error: 'Bad Request - The server is unable to handle the request' });
}

function reqUnauthorized(req,res) {
    res.status(401).send({ error: 'Request Not Authorized' });
}

function reqAccessDenied(req,res) {
    res.status(403).send({ error: 'Access Denied' });
}

function reqServerFailure(req,res) {
     res.status(500).send({ error: 'Internal Server Error' });
}

function reqServerUnavailable(req,res, reason) {
     res.status(500).send({ error: `Server is temporaryily unavailible: ${reason}` });
}


export defualt {
    reqUnauthorized,
    reqAccessDenied,
    reqInvalid,
    reqServerFailure,
    reqServerUnavailable
}