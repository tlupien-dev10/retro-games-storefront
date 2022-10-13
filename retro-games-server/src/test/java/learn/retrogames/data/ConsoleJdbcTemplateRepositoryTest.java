package learn.retrogames.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ConsoleJdbcTemplateRepositoryTest {

    @Autowired
    ConsoleJdbcTemplateRepository consoleJdbcTemplateRepository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldGetAvailableConsoleIds(){
        List<Integer> consoleIds = consoleJdbcTemplateRepository.getAvailableConsoleIds();
        List<Integer> expected = new ArrayList<>();
        expected.add(1);
        expected.add(2);
        expected.add(3);
        expected.add(4);
        expected.add(5);
        assertEquals(expected, consoleIds);
    }
}
