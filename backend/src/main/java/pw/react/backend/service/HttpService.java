package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.LinkedList;
import java.util.List;

public class HttpService implements HttpClient {

    private final Logger logger = LoggerFactory.getLogger(HttpService.class);

    private String carlyUrl;
    private String flatlyUrl;
    private String parklyUrl;
    private String integrationUrl;

    private final SecurityProvider securityProvider;
    private final RestTemplate restTemplate;

    public HttpService(SecurityProvider securityProvider, RestTemplate restTemplate) {
        this.securityProvider = securityProvider;
        this.restTemplate = restTemplate;
    }

    HttpService withCarlyUrl(String carlyUrl) {
        this.carlyUrl = carlyUrl;
        return this;
    }

    HttpService withFlatlyUrl(String flatlyUrl) {
        this.flatlyUrl = flatlyUrl;
        return this;
    }

    HttpService withParklyUrl(String parklyUrl) {
        this.parklyUrl = parklyUrl;
        return this;
    }

    HttpService withIntegrationUrl(String integrationUrl) {
        this.integrationUrl = integrationUrl;
        return this;
    }

    @PostConstruct
    private void init() {
        logger.info("Injected CARLY URL: [{}]", carlyUrl);
        logger.info("Injected PARKLY URL: [{}]", parklyUrl);
        logger.info("Injected FLATLY URL: [{}]", flatlyUrl);
        logger.info("Injected INTEGRATION URL: [{}]", integrationUrl);
    }


    private <T> HttpEntity<T> getRequestEntity(T entity) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(securityProvider.getSecurityHeader(), securityProvider.getSecurityHeaderValue());
        return new HttpEntity<>(entity, headers);
    }
}
