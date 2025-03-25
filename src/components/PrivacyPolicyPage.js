import "../assets/css/PrivacyPolicy.css";
import "../App.css";

function PrivacyPolicy() {

    return (
        <div id="privacyPolicy" className='container'>

            <h1 className='center' id="privacyPolicyHeader">Privacy Policy</h1>

            <div className='box' id="privacyPolicyIntroParagraph">
                <p>
                    This privacy policy provides how Aardvark Games uses and protects any information that you give or share when you use 
                    this website. Aardvark Games is committed to ensuring that your privacy is protected. When we ask you to provide certain 
                    information by which you can be identified when using this website, then you can be assured that it will only be used in 
                    accordance with this privacy statement. Aardvark Games may change this policy from time to time by updating this page. 
                    You should check this page from time to time to ensure that you are happy with any changes. This policy has been effective 
                    since 11.01.2022 updated 01.01.2024
                </p>
            </div>

            <div className='box' id="privacyPolicyCollectInfo">
                <h3 className="noMargin">We may collect the following information:</h3>

                <ul>
                    <li>Name</li>
                    <li>Contact information including email address</li>
                    <li>Demographic and personal information such as college enrollment and player bio</li>
                    <li>Other information relevant to mailing list or popularity voting</li>
                </ul>
            </div>

            <div className='box' id="privacyPolicyWhyRequired">
                <h3 className="noMargin">Why required and what we do with the information we gather:</h3>

                <ul>
                    <li>We require this information to understand your needs and provide you with a better service, and, in particular, for the following reasons: To execute an international game tournament.</li>
                    <li>We may use the information to improve our products and services.</li>
                    <li>We may periodically send promotional email about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                    <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail.</li>
                    <li>We may use the information to customize the website according to your interests.</li>
                    <li>We will never sell your information.</li>
                </ul>
            </div>

        </div>
    );
}

export default PrivacyPolicy;