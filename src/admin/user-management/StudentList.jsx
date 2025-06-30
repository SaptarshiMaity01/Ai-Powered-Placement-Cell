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

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
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
      department: "",
      isActive: true,
    },
  });

  // Fetch students with pagination
  const fetchStudents = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/students?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data.data); // Access data array directly
      setPagination(response.data.pagination); // Use pagination object directly
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    console.log("🟠 useEffect: user is", user); // Make sure user is truthy
    if (user) {
      fetchStudents(); // Force trigger it
    }
  }, [user]);
  // Filter students
  useEffect(() => {
    if (!students.length) {
      setFilteredStudents([]);
      return;
    }
    
    const filtered = students.filter((student) => {
      const matchesSearch = 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        
      const matchesFilter = 
        activeFilter === "all" ||
        (activeFilter === "active" && student.isActive) ||
        (activeFilter === "inactive" && !student.isActive);
        
      return matchesSearch && matchesFilter;
    });
    
    const sortedStudents = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredStudents(sortedStudents);
  }, [students, searchTerm, activeFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    form.reset({
      _id: student._id,
      name: student.name,
      email: student.email,
      department: student.department || "",
      isActive: student.isActive,
    });
    setIsDialogOpen(true);
  };

  // Updated handleSubmitEdit with proper auth
  const handleSubmitEdit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/students/${values._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setStudents(students.map(student => 
        student._id === values._id ? response.data : student
      ));
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to update student", err);
      toast({
        title: "Error",
        description: "Could not update student: " + (err.response?.data?.message || err.message),
        variant: "destructive",
      });
    }
  };

  // Updated handleStatusToggle with proper auth
  const handleStatusToggle = async (studentId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/api/students/${studentId}/status`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setStudents(students.map(student => 
        student._id === studentId ? response.data : student
      ));
      toast({
        title: "Status Updated",
        description: `Student status changed to ${!currentStatus ? 'active' : 'inactive'}.`,
      });
    } catch (err) {
      console.error("Failed to update student status", err);
      toast({
        title: "Error",
        description: "Could not update student status.",
        variant: "destructive",
      });
    }
  };

  // Updated confirmDelete with proper auth
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/students/${studentToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setStudents(students.filter(student => student._id !== studentToDelete));
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    } catch (err) {
      console.error("Failed to delete student", err);
      toast({
        title: "Error",
        description: "Could not delete student",
        variant: "destructive",
      });
    } finally {
      setStudentToDelete(null);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchStudents(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Management</CardTitle>
        <div className="flex flex-col md:flex-row gap-4 text-black">
          <Input 
            placeholder="Search by name, email or department..." 
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm"
          />
          <Select value={activeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
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
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department || "-"}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      isActive={student.isActive} 
                      onToggle={() => handleStatusToggle(student._id, student.isActive)}
                    />
                  </TableCell>
                  <TableCell className="text-right text-black">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditStudent(student)}
                        aria-label="Edit student"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setStudentToDelete(student._id)}
                        aria-label="Delete student"
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
                  No students found
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
            <DialogTitle>Edit Student Information</DialogTitle>
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
                      <Input placeholder="Student name" {...field} />
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Department" {...field} />
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
      <Dialog open={!!studentToDelete} onOpenChange={(open) => !open && setStudentToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this student? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStudentToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StudentList;