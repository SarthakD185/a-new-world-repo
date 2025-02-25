<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;


    require 'vendor/autoload.php';

    #$email = $_POST["email"];
    #$name = $_POST["firstname"];
    #$verificationCode //This comes from some function that generates a code and then stores and relates it to the user's email in the database


    function generateVeriCode(){
        $nums = '0123456789';
        $code = '';
        for ($i = 0; $i < 3; $i++) {
            $code .= $nums[rand(0, strlen($nums) - 1)];
        }
        return $code;
    }


    function sendVerificationEmail($email, $verificationCode, $name) {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->IsSMTP(); // telling the class to use SMTP
            $mail->SMTPAuth = true; // enable SMTP authentication
            $mail->SMTPSecure = "ssl"; // sets the prefix to the servier
            $mail->Host = "smtp.gmail.com"; // sets GMAIL as the SMTP server
            $mail->Port = 465; // set the SMTP port for the GMAIL server
            $mail->Username = "debugfrogsmail@gmail.com"; // GMAIL username
            $mail->Password = "ifsx xdts xpzb lxly"; // GMAIL password

            // Recipients
            $mail->setFrom('debugfrogsmail@gmail.com', 'A New World Mail');
            $mail->addAddress($email, $name); #Grabbed from site data

            // Content
            #Sets up the email to send a code for verification to the end user
            $mail->isHTML(false);
            $mail->Subject = 'Email Verification';
            $mail->Body    = "Your verification code is: $verificationCode";

            // Sending the Email
            try{
                $mail->Send();
                echo "Success!";
            } catch(Exception $e){
                #Something went wrong
                echo "Fail - " . $mail->ErrorInfo;
            }
            
                        $mail->send();
                        return true;
                    } catch (Exception $e) {
                        return false;
                    }
                }

$veriCode = generateVeriCode();
sendVerificationEmail($email, $veriCode, $name)

?>