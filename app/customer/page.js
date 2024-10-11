"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd } = useForm();
  const { register: registerUpdate, handleSubmit: handleSubmitUpdate, reset: resetUpdate } = useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch("/api/customer");
    const data = await response.json();
    setCustomers(data);
  };

  const onSubmitAdd = async (data) => {
    try {
      // Convert date to the required format
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(), // Convert date to ISO 8601 format
      };

      // Create new customer
      await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      // Clear the form fields after successful creation
      resetAdd();
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      // Convert date to the required format
      const formattedData = {
        ...data,
        date: new Date(data.date).toISOString(), // Convert date to ISO 8601 format
      };

      // Update existing customer
      await fetch(`/api/customer/${currentCustomer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: currentCustomer._id, ...formattedData }), // Include _id
      });

      // Clear the form fields after successful update
      resetUpdate();
      setCurrentCustomer(null); // Clear current customer
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    // Populate the update form with current customer data
    resetUpdate({
      name: customer.name,
      date: customer.date.split("T")[0], // Set date to 'YYYY-MM-DD' format for the input
      member: customer.member,
      interests: customer.interests,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/customer/${id}`, {
      method: "DELETE",
    });
    fetchCustomers();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      {/* Add Customer Form */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <form onSubmit={handleSubmitAdd(onSubmitAdd)}>
          <Typography variant="h5" gutterBottom>
            Add Customer
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                {...registerAdd("name")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                {...registerAdd("date")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Member"
                type="number"
                variant="outlined"
                fullWidth
                {...registerAdd("member")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Interests"
                variant="outlined"
                fullWidth
                {...registerAdd("interests")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Update Customer Form */}
      {currentCustomer && (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
          <form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
            <Typography variant="h5" gutterBottom>
              Update Customer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...registerUpdate("name")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  {...registerUpdate("date")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Member"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...registerUpdate("member")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Interests"
                  variant="outlined"
                  fullWidth
                  {...registerUpdate("interests")}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Customer
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Customer List
      </Typography>
      <List>
        {customers.map((customer) => (
          <div key={customer._id}>
            <ListItem>
              <ListItemText
                primary={customer.name}
                secondary={`Interests: ${customer.interests} | Member: ${customer.member} | Date: ${customer.date.split("T")[0]}`}
              />
              <IconButton onClick={() => handleEdit(customer)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(customer._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default CustomerPage;
