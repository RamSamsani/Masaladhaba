package in.uk.md.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(message);
        email.setFrom("info@masaladhaba.co.uk"); 
        
        javaMailSender.send(email);
    }

    public void sendBookingConfirmationToAdmin(String customerName, String email, int noOfPersons, String bookingDate, String timeSlot) {
        String subject = "Table Reservation Booking";
        String message = String.format("A new booking has been made:\n\n" +
                                      "Customer Name: %s\n" +
                                      "Email: %s\n" +
                                      "No of Persons: %d\n" +
                                      "Booking Date: %s\n" +
                                      "Time Slot: %s\n", 
                                      customerName, email, noOfPersons, bookingDate, timeSlot);
        sendEmail("bookingsatmd@gmail.com", subject, message);  // Replace with your admin email
    }

}
