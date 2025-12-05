/**
* html template for admin notification email
 * @param {string} name - Name of the contact
 * @param {string} email - email of the contact
 * @param {string} subject - subject of the message
 * @param {string} message - content of the message
 * @returns {string} - The complete HTML code
 */
export const AdminNotificationTemplate = (name, email, subject, message) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Helvetica', 'Arial', sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
            .header { background-color: #5843e4; color: white; padding: 20px; text-align: center; }
            .content { padding: 25px; }
            .meta { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #5843e4; }
            .label { font-weight: bold; color: #555; display: inline-block; width: 60px; }
            .message-box { background-color: #fafafa; padding: 20px; border-radius: 5px; border: 1px solid #eee; white-space: pre-wrap; font-size: 15px; }
            .footer { font-size: 12px; color: #999; text-align: center; padding: 15px; background: #f4f4f4; border-top: 1px solid #eee; }
            a { color: #5843e4; text-decoration: none; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin:0;">Nouveau Contact</h2>
            </div>
            
            <div class="content">
                <!-- Bloc Informations -->
                <div class="meta">
                    <div><span class="label">De :</span> ${name}</div>
                    <div style="margin-top: 5px;">
                        <span class="label">Email :</span> 
                        <a href="mailto:${email}">${email}</a>
                    </div>
                        <div style="margin-top: 5px;"><span class="label">Sujet :</span> ${subject || 'Non précisé'}</div>
                </div>

                <!-- Bloc Message -->
                <h3 style="margin-top: 0; color: #333;">Message :</h3>
                <div class="message-box">${message}</div>
            </div>

            <div class="footer">
                Envoyé depuis le formulaire de contact jonathangleyze.fr
            </div>
        </div>
    </body>
    </html>
    `;
};