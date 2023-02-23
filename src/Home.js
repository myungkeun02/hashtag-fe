import "./App.css";
import { Button, Container, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setResult = (res) => {
    sessionStorage.setItem("result", res);
  };

  const sendRequest = () => {
    if (keyword === "") {
      alert("키워드를 입력해주세요");
      return;
    }

    setIsLoading(true);
    axios
      .post("https://tag-api.audrms.com/hashtag", { keyword })
      .then((res) => {
        console.log(res);
        setResult(res.data);
        setIsLoading(false);
        window.location.href = "/result";
      })
      .catch((err) => {
        console.log(err);
        alert("API 요청 중 오류가 발생했습니다");
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Flex direction="column" alignItems="center">
        <Heading mt={30}>어떤 해시태그를 만들까요?</Heading>
        <Input
          mt={30}
          placeholder="해시태그를 입력하세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button
          mt={10}
          colorScheme="teal"
          isLoading={isLoading}
          loadingText="잠시만 기다려주세요"
          onClick={sendRequest}
        >
          만들기
        </Button>
      </Flex>
    </Container>
  );
}

export default Home;
