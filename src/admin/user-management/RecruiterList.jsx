import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../../components/ui/form";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";
import StatusBadge from "./StatusBadge";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../../components/ui/pagination";

const RecruiterList = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recruiterToEdit, setRecruiterToEdit] = useState(null);
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const { toast } = useToast();
  const user = useSelector((state) => state.user.user);

  const form = useForm({
    defaultValues: {
      _id: "",
      name: "",
      email: "",
      company: "",
      isActive: true,
    },
  });

  // Fetch recruiters with pagination
  const fetchRecruiters = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/companys?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecruiters(response.data.data);
      setPagination(response.data.pagination);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch recruiters:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch recruiters",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecruiters();
    }
  }, [user]);

  // Filter recruiters
  useEffect(() => {
    if (!recruiters.length) {
      setFilteredRecruiters([]);
      return;
    }
    
    const filtered = recruiters.filter((recruiter) => {
      const matchesSearch = 
        recruiter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruiter.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruiter.company?.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesFilter = 
        activeFilter === "all" ||
        (activeFilter === "active" && recruiter.isActive) ||
        (activeFilter === "inactive" && !recruiter.isActive);
        
      return matchesSearch && matchesFilter;
    });
    
    const sortedRecruiters = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredRecruiters(sortedRecruiters);
  }, [recruiters, searchTerm, activeFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const handleEditRecruiter = (recruiter) => {
    setRecruiterToEdit(recruiter);
    form.reset({
      _id: recruiter._id,
      name: recruiter.name,
      email: recruiter.email,
      company: recruiter.company || "",
      isActive: recruiter.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmitEdit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/companys/${values._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setRecruiters(recruiters.map(recruiter => 
        recruiter._id === values._id ? response.data : recruiter
      ));
      toast({
        title: "Success",
        description: "Recruiter updated successfully",
      });
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to update recruiter", err);
      toast({
        title: "Error",
        description: "Could not update recruiter: " + (err.response?.data?.message || err.message),
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (recruiterId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/api/companys/${recruiterId}/status`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setRecruiters(recruiters.map(recruiter => 
        recruiter._id === recruiterId ? response.data : recruiter
      ));
      toast({
        title: "Status Updated",
        description: `Recruiter status changed to ${!currentStatus ? 'active' : 'inactive'}.`,
      });
    } catch (err) {
      console.error("Failed to update recruiter status", err);
      toast({
        title: "Error",
        description: "Could not update recruiter status.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/companys/${recruiterToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setRecruiters(recruiters.filter(recruiter => recruiter._id !== recruiterToDelete));
      toast({
        title: "Success",
        description: "Recruiter deleted successfully",
      });
    } catch (err) {
      console.error("Failed to delete recruiter", err);
      toast({
        title: "Error",
        description: "Could not delete recruiter",
        variant: "destructive",
      });
    } finally {
      setRecruiterToDelete(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchRecruiters(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading recruiters...</p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiter Management</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 text-black">
          <Input 
            placeholder="Search by name, email or company..." 
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm"
          />
          <Select value={activeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Recruiters</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecruiters.length > 0 ? (
              filteredRecruiters.map((recruiter) => (
                <TableRow key={recruiter._id}>
                  <TableCell className="font-medium">{recruiter.name}</TableCell>
                  <TableCell>{recruiter.company || "-"}</TableCell>
                  <TableCell>{recruiter.email}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      isActive={recruiter.isActive} 
                      onToggle={() => handleStatusToggle(recruiter._id, recruiter.isActive)}
                    />
                  </TableCell>
                  <TableCell className="text-right text-black">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditRecruiter(recruiter)}
                        aria-label="Edit recruiter"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setRecruiterToDelete(recruiter._id)}
                        aria-label="Delete recruiter"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No recruiters found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {pagination.pages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4">
                  Page {pagination.page} of {pagination.pages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black/80">Edit Recruiter Information</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitEdit)} className="space-y-4 text-black">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Recruiter name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!recruiterToDelete} onOpenChange={(open) => !open && setRecruiterToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-black">Are you sure you want to delete this recruiter? This action cannot be undone.</p>
          <DialogFooter className="justify-between">
            
            <Button className="text-black" variant="outline" onClick={() => setRecruiterToDelete(null)}>
              Cancel
            </Button>
          
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Recruiter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RecruiterList;