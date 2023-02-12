import React, { useEffect, useState } from "react";
import {Paper, Button, Stack,Typography , List, ListItem, ListItemText} from '@mui/material';
import Web3 from 'web3';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../config'


const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const electionContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


const Voting = () => {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [connection, setConnection] = useState('Not Connected!');
    const [candidates, setCandidates] = useState([]);
    


    const getCandidates = async () => {
      const candidateCount = await electionContract.methods.candidatesCount().call();
      const candidatesList = [];
      for (let i=1; i <= candidateCount; i++){
        const candidate = await electionContract.methods.candidates(i).call();
        candidatesList.push(candidate);
      }
      setCandidates(candidatesList)
      console.log(candidatesList);
    }

    const connect = async () => {
        const accounts = await web3.eth.requestAccounts();
      
        setConnection(`Connected to ${accounts[0]}`)
        setAccount(accounts[0]);
        await getCandidates();
        //setCandidates(candidates);
    }

    const disconnect = () => {
        setAccount(null);
        console.log(account);
        setConnection('Not Connected!!');
    }
    

    const vote =  async (candidateId) => {
      try {
        const tx = await electionContract.methods.vote(candidateId).send({from: account});
        console.log(tx);
        await getCandidates();
        setMessage(`You have successfully voted for ${candidateId.name}`)
      } catch (error){
        console.log(error)
        setErrorMessage(error.message);
      }
    }

    return (
       <Paper elevation={3} sx={{p:3}}>
        <Stack spacing={2}>
            <Typography variant="h6">
                Account : {account}
            </Typography>
             <Button onClick={account ? disconnect : connect}>
                {account ? 'Disconnect' : 'Connect' }
            </Button>
            <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {
        candidates.map(candidate => (
          <ListItem key={candidate.id}>
            <ListItemText primary={candidate.name} />
            <ListItemText secondary={candidate.voteCount} />
            <Button onClick={() => vote(candidate.id)}>
              Vote 
            </Button>
          </ListItem>
        ))
      }

      </List>
     
     <Typography variant="h6">
      Done:  {message} 
      </Typography> 

        </Stack>
       </Paper>

    );
}

export default Voting;