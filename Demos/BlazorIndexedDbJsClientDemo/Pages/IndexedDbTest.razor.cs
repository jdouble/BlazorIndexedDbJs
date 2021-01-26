using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using BlazorIndexedDbJsClientDemo.Data;
using System.Linq;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Pages
{
    public partial class IndexedDbTest: ComponentBase, IDisposable
    {
        [Inject]
        public TheFactoryDb theFactoryDb {get; set; }

        private string Message { get; set; }
        private IList<Person> People { get; set; } = new List<Person>();
        private Person CurrentPerson { get; set; } = new Person();
        private string SearchFirstName;

        protected override void OnInitialized()
        {
            theFactoryDb.ActionCompleted += OnIndexedDbNotification;
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await GetAll();
                StateHasChanged();
            }
        }

        public void Dispose()
        {
            theFactoryDb.ActionCompleted -= OnIndexedDbNotification;
        }

        private async Task GetRecords(string firstName = "", int? count = null)
        {
            IList<Person> results;

            if (String.IsNullOrEmpty(firstName))
            {
                results = await theFactoryDb.GetAll<Person>(TheFactoryDb.Employees, count);
            }
            else
            {
                results = await theFactoryDb.GetAllFromIndex<string, Person>(TheFactoryDb.Employees, "firstName", firstName);
            }


            if (results != null && results.Any())
            {
                People = results;
            }
            else
            {
                People.Clear();
                Message = "No Records found";
            }

            StateHasChanged();
        }

        private async Task ClearStore()
        {
            await theFactoryDb.ClearStore(TheFactoryDb.Employees);

            await GetRecords();
        }

        private async Task RecreateDb()
        {
            await theFactoryDb.DeleteDb();

            await GetRecords();
        }

        private async Task GetAll(int? count = null)
        {
            People = await theFactoryDb.GetAll<Person>(TheFactoryDb.Employees, count);
        }

        private async Task GetByKey(int key, int? count = null)
        {
            People = await theFactoryDb.GetAll<int, Person>(TheFactoryDb.Employees, key, count);
        }

        private async Task GetByKeyArray(int[] key)
        {
            People = await theFactoryDb.GetAll<int, Person>(TheFactoryDb.Employees, key);
        }

        private async Task GetByKeyRange(int lower, int upper, int? count = null)
        {
            var range = new IDBKeyRange<int>() {
                Lower = lower,
                Upper = upper
            };
            People = await theFactoryDb.GetAll<int, Person>(TheFactoryDb.Employees, range, count);
        }

        private async Task GetByFilter()
        {
            People = await theFactoryDb.Query<Person>(TheFactoryDb.Employees, "return obj.firstName.startsWith('person');", 10, 10);
        }

        private async Task EditPerson(long id)
        {
            try
            {
                CurrentPerson = await theFactoryDb.Get<long, Person>(TheFactoryDb.Employees, id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        private async void AddRecord()
        {
            if (CurrentPerson.Id.HasValue)
            {
                await theFactoryDb.Put(TheFactoryDb.Employees, CurrentPerson);
            }
            else
            {
                await theFactoryDb.Add(TheFactoryDb.Employees, CurrentPerson);
            }

            CurrentPerson = new Person();

            await GetRecords();
        }

        private async void AddRecords()
        {
            var list = new List<Person>();

            for (int i = 0; i < 100; i++)
            {
                var person = new Person() {
                    FirstName = "person "+i.ToString(),
                    LastName = "lastname "+i.ToString()
                };

                list.Add(person);
            }

            await theFactoryDb.BatchAdd<Person>(TheFactoryDb.Employees, list.ToArray());

            await GetRecords();
        }

        private async Task DeleteRecord(long? id)
        {
            await theFactoryDb.Delete(TheFactoryDb.Employees, id);

            await GetRecords();
        }

        private async Task SearchRecords()
        {
            await GetRecords(SearchFirstName);
        }

        private void OnIndexedDbNotification(object sender, IDBManagerNotificationArgs args)
        {
            Message = args.Message;

            StateHasChanged();
        }
    }
}