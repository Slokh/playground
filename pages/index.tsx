import { Button } from "@chakra-ui/button";
import { Flex, Stack } from "@chakra-ui/layout";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Input } from "@chakra-ui/input";
import { useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { BigNumber, ethers } from "ethers";
import { _fetchData } from "@ethersproject/web";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainnet
    4, // Rinkeby
  ],
});

const address = "0x495f947276749ce646f68ac8c248420045cb7b5e";
const abi = [
  "function setURI(uint256 _id, string memory _uri)",
  "function uri(uint256 id) public view returns (string)",
];

const Home = () => {
  const [current, setCurrent] = useState("");
  const [uri, setURI] = useState("");
  const [id, setID] = useState("");
  const { account, activate, active, library } = useWeb3React<Web3Provider>();

  const handleSubmit = async () => {
    const contract = new ethers.Contract(address, abi, library?.getSigner());

    console.log(await contract.setURI(BigNumber.from(id), uri));
  };

  useEffect(() => {
    const fetchData = async () => {
      const contract = new ethers.Contract(address, abi, library);

      setCurrent(await contract.uri(id));
    };
    if (active && id) {
      fetchData();
    }
  }, [id]);

  return (
    <Stack p={4} w="lg">
      <Flex>
        <Button onClick={() => activate(injectedConnector)} isDisabled={active}>
          {active ? "Disconnect" : "Connect"}
        </Button>
      </Flex>
      <Flex>{active ? `Connected to ${account}` : "Not connected"}</Flex>
      {active && (
        <>
          <Flex>
            <FormControl>
              <FormLabel>ID</FormLabel>
              <Input onChange={(e) => setID(e.currentTarget.value)} />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl>
              <FormLabel>URI</FormLabel>
              <Input onChange={(e) => setURI(e.currentTarget.value)} />
            </FormControl>
          </Flex>
          <Flex>{`Current URI: ${current}`}</Flex>
          <Flex>{`New URI: ${uri}`}</Flex>
          <Flex>
            <Button isDisabled={!active} onClick={handleSubmit}>
              Update URI
            </Button>
          </Flex>
        </>
      )}
    </Stack>
  );
};

export default Home;
