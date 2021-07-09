const lambdaFunction = async (event, context) => {
	console.log(event)
	console.log(context)
	return { statusCode: 200, body: JSON.stringify({ success: true }) }
}

module.exports = { lambdaFunction: lambdaFunction }