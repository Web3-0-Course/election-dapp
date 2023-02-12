import React, { useEffect, useState } from "react";
import {Paper, Button, Stack,Typography , List, ListItem, ListItemText, ListSubheader, TablePagination} from '@mui/material';
import Web3 from 'web3';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../config'



const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
let electionContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


const Voting = () => {
    const [message, setMessage] = useState('Please Connect Your Wallet to Vote' );
    const [errorMessage, setErrorMessage] = useState(null);
    const [voted, setVoted] = useState(false);
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
      
        setConnection(`Connected to ${accounts[0]}`);
        setAccount(accounts[0]);
        await getCandidates();
        if (!voted){
          setMessage('You voted!')
        }
        else {
          setMessage('Please Vote!!')
        }
       
    }

    

    const disconnect = () => {
        setAccount(null);
        console.log(account);
        setConnection('Not Connected!!');
        setCandidates([]);
        setMessage('Please Connect your wallet to wallet')   
    }

    useEffect(() => {
      if (!account){
        const intervalid = setInterval(() => {
         
        },1000)
        return () => clearInterval(intervalid);
      }
    },[]);

    const vote =  async (candidateId, account) => {
      try {
        if (!voted){
          const tx = await electionContract.methods.vote(candidateId,account).send({from: account});
          console.log(tx);
          await getCandidates();
          setVoted(true);
          setMessage(`You have successfully voted for ${candidates[candidateId].name}`)
        } else {
          setErrorMessage('You have already voted!');
        }
      } catch (error){
        console.log(error)
        setErrorMessage(error.message); 
      }
    }

    useEffect(() => {
      if (account){
        const intervalid = setInterval(() => {
          getCandidates();
        }, 2000);
      return () => clearInterval(intervalid); 
      }

    },[account, getCandidates])

    return (
       <Paper elevation={3} sx={{p:3}}>
        <Stack spacing={2}>
          <Typography variant="h3" color='purple' fontFamily='fantasy'>
            Decentralized Voting System with Ethereum and React.js
          </Typography>

        <Button variant="outlined"  style={{maxWidth:'200px', maxHeight:'50px', minWidth:'40px', minHeight:'30px', marginLeft:'80%', marginTop:'5%' }} 
   color={account ? 'error' : 'success' } onClick={account ? disconnect : connect}>
                {account ? 'Disconnect' : 'Connect Wallet' }
        </Button>
            
      { account ? ( 
      <List
        sx={{
          width: '70%',
          maxWidth: '70%',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& nl': { padding: 0 },
        }}>
          <ListSubheader style={{ textAlign: 'center' }} >Candidates</ListSubheader>
      {
        candidates.map(candidate => (
          
          <ListItem key={candidate.id}>
            <ListItemText primary={candidate.name} />
            <ListItemText secondary={candidate.voteCount} />
            <Button onClick={() => vote(candidate.id,account)}>
              Vote 
            </Button>
          </ListItem>
          
        ))
      }

      </List>) : (
        null 
      )
    }
        <Typography variant="h8">
          {connection}
          <br />
            {message}
        </Typography>
        </Stack>
       </Paper>
    );
}

export default Voting;