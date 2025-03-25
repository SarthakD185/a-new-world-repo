import "../assets/css/PrivacyPolicy.css";
import "../App.css";

function Security() {

    return (
        <div id="security" className='container'>

            <h1 className='center' id="securityHeader">Security</h1>

            <div className='box' id="securityIntroParagraph">
                <p>
                We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, 
                we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information 
                we collect online.
                </p>
            </div>

            <div className='box' id="securityCookies">
                <h3 className="noMargin">How we use cookies</h3>

                <ul>
                    <li>A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, your likes and dislikes, by gathering and remembering information about your preferences. </li>
                    <li>We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</li>
                    <li>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</li>
                    <li>Links to other websites, our website may contain links to enable you to visit other websites of interest easily. However, once you have used these links to leave our site, you should note that we do not have any control over that other website.</li>
                    <li>Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</li>
                </ul>
            </div>

            <div className='box' id="securityPersonalInfo">
                <h3 className="noMargin">Controlling your personal information</h3>

                <ul>
                    <li>You may choose to restrict the collection or use of your personal information in the following ways:</li>
                    <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us.</li>
                    <li>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</li>
                    <li>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable.</li>
                    <li>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, through our contact form. We will promptly correct any information found to be incorrect.</li>
                    <li>We respect your right to privacy and sincerely work to protect your information.</li>
                </ul>
            </div>

        </div>
    );
}

export default Security;