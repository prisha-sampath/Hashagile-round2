class EmployeeCollection {
          constructor() {
              this.collections = {};
          }
      
          createCollection(p_collection_name) {
              if (!this.collections[p_collection_name]) {
                  this.collections[p_collection_name] = [];
                  console.log(`Collection '${p_collection_name}' created successfully.`);
              } else {
                  console.log(`Collection '${p_collection_name}' already exists.`);
              }
          }
      
          indexData(p_collection_name, p_exclude_column, employeeData) {
              if (!this.collections[p_collection_name]) {
                  console.error(`Collection '${p_collection_name}' does not exist.`);
                  return;
              }
      
              const indexedData = { ...employeeData };
              delete indexedData[p_exclude_column];
              this.collections[p_collection_name].push(indexedData);
              console.log(`Employee data indexed successfully in '${p_collection_name}' collection.`);
          }
      
          searchByColumn(p_collection_name, p_column_name, p_column_value) {
              if (!this.collections[p_collection_name]) {
                  console.error(`Collection '${p_collection_name}' does not exist.`);
                  return [];
              }
      
              return this.collections[p_collection_name].filter(
                  (record) => record[p_column_name] === p_column_value
              );
          }
      
          getEmpCount(p_collection_name) {
              if (!this.collections[p_collection_name]) {
                  console.error(`Collection '${p_collection_name}' does not exist.`);
                  return 0;
              }
      
              return this.collections[p_collection_name].length;
          }
      
          delEmpById(p_collection_name, p_employee_id) {
              if (!this.collections[p_collection_name]) {
                  console.error(`Collection '${p_collection_name}' does not exist.`);
                  return;
              }
      
              const collection = this.collections[p_collection_name];
              const index = collection.findIndex((record) => record.id === p_employee_id);
      
              if (index !== -1) {
                  collection.splice(index, 1);
                  console.log(`Employee with ID '${p_employee_id}' deleted successfully.`);
              } else {
                  console.log(`Employee with ID '${p_employee_id}' not found.`);
              }
          }
      
          getDepFacet(p_collection_name) {
              if (!this.collections[p_collection_name]) {
                  console.error(`Collection '${p_collection_name}' does not exist.`);
                  return {};
              }
      
              return this.collections[p_collection_name].reduce((facet, record) => {
                  const department = record.department || "Unknown";
                  facet[department] = (facet[department] || 0) + 1;
                  return facet;
              }, {});
          }
      }
      
      const empCollection = new EmployeeCollection();
      
      empCollection.createCollection("Employees");
      
      empCollection.indexData("Employees", "salary", {
          id: 1,
          name: "Alice",
          department: "HR",
          salary: 50000,
      });
      empCollection.indexData("Employees", "salary", {
          id: 2,
          name: "Bob",
          department: "IT",
          salary: 70000,
      });
      empCollection.indexData("Employees", "salary", {
          id: 3,
          name: "Charlie",
          department: "HR",
          salary: 60000,
      });
      
      console.log(empCollection.searchByColumn("Employees", "department", "HR"));
      
      console.log(`Total employees: ${empCollection.getEmpCount("Employees")}`);
      
      empCollection.delEmpById("Employees", 2);
      
      console.log(empCollection.getDepFacet("Employees"));
      
