package in.uk.md.ks;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.io.FileInputStream;
import java.io.IOException;

public class TestKeystore {

	public static void main(String[] args) throws KeyStoreException, NoSuchAlgorithmException, CertificateException, IOException {
		String keystorePath = "src/main/resources/masaladhaba.p12";
        String password = "Moonlightg@67";
        
        try (FileInputStream fis = new FileInputStream(keystorePath)) {
            KeyStore keystore = KeyStore.getInstance("PKCS12");
            keystore.load(fis, password.toCharArray());
            System.out.println("Keystore loaded successfully.");
        } catch (Exception e) {
            System.err.println("Error loading keystore: " + e.getMessage());
            e.printStackTrace();
        }
	}

}
