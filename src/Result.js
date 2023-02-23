import {
  Container,
  Flex,
  Heading,
  Button,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Result() {
  const [result, setResult] = useState("");

  const getResult = () => {
    const result = sessionStorage.getItem("result");
    setResult(result);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Container>
      <Flex direction="column" alignItems="center">
        <Heading mt={30}>생성된 해시태그에요</Heading>
        <Textarea
          mt={30}
          value={result}
          onChange={(e) => {
            setResult(e.target.value);
          }}
        />
        <SimpleGrid mt={10} columns={2} spacing={1}>
          <CopyToClipboard
            text={result}
            onCopy={() => {
              alert("클립보드에 복사되었어요!");
            }}
          >
            <Button colorScheme="teal">복사하기</Button>
          </CopyToClipboard>
          <Button
            colorScheme="purple"
            onClick={() => {
              sessionStorage.removeItem("result");
              window.location.href = "/";
            }}
          >
            다시하기
          </Button>
        </SimpleGrid>
      </Flex>
    </Container>
  );
}
