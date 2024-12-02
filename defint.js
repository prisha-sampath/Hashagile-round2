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
      
      const v_nameCollection = "Hash_SreePrisha";
      const v_phoneCollection = "Hash_0902";
      
      empCollection.createCollection(v_nameCollection);
      empCollection.createCollection(v_phoneCollection);
      
      console.log(`Employee count: ${empCollection.getEmpCount(v_nameCollection)}`);
      
      empCollection.indexData(v_nameCollection, "Department", {
          id: "E02001",
          name: "Alice",
          department: "IT",
          gender: "Female",
      });
      empCollection.indexData(v_phoneCollection, "Gender", {
          id: "E02002",
          name: "Bob",
          department: "HR",
          gender: "Male",
      });
      
      console.log(`Employee count: ${empCollection.getEmpCount(v_nameCollection)}`);
      
      empCollection.delEmpById(v_nameCollection, "E02003");
      
      console.log(`Employee count: ${empCollection.getEmpCount(v_nameCollection)}`);
      
      console.log(empCollection.searchByColumn(v_nameCollection, "Department", "IT"));
      console.log(empCollection.searchByColumn(v_nameCollection, "Gender", "Male"));
      console.log(empCollection.searchByColumn(v_phoneCollection, "Department", "IT"));
      
      console.log(empCollection.getDepFacet(v_nameCollection));
      console.log(empCollection.getDepFacet(v_phoneCollection));
      
