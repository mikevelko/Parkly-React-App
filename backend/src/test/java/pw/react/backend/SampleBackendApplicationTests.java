package pw.react.backend;

import org.springframework.beans.factory.annotation.Autowired;
import pw.react.backend.service.HttpClient;

//@SpringBootTest
//@ActiveProfiles(profiles = {"mysql-dev"})
class SampleBackendApplicationTests {

	@Autowired
	private HttpClient httpService;

	//@Test
	void contextLoads() {
	}

	//@Test
	void whenConsume_thenReturnQuote() {
		//final Quote quote = httpService.consume("");
		//assertThat(quote).isNotNull();
	}
}
