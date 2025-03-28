import { useEffect } from "react";

const StripeButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id='stripeButton'>
      <stripe-buy-button
        buy-button-id="buy_btn_1R7Oy9RpKvOKttKIvGI6skqS"
        publishable-key="pk_test_51R7OhLRpKvOKttKI1UGW7zEzMiuGhpfAXtRxv9llNMmXY7M1Za9L6wp6PJrz5p518Z7yBhH2JON65DgcqK5ugWhE00gRD9y4us">
      </stripe-buy-button>
    </div>
  );
};

export default StripeButton;
