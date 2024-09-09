
const connectingSlack = async(message) => {
    try {
        const webhookurl = process.env.SLACK_WEBHOOK_URL

        const response = await fetch(webhookurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: `New login: ${message} just logged in!`
            })
        });
        if (response.status === 200) {
            console.log('Slack notification sent successfully');
        } else {
            console.log('Failed to send Slack notification:', response.status);
        }
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
};

export async function POST(request){ 
    const data = await request.json();

    await connectingSlack(data.message);

    return Response.json({status:' ok'});
}