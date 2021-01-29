package pw.react.backend.integration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.service.HttpClient;

import java.util.List;

@RestController
@RequestMapping(path = "/integration/")
public class IntegrationController {

    private final HttpClient httpClient;

    @Autowired
    public IntegrationController(HttpClient httpClient) {
        this.httpClient = httpClient;
    }
}
