using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarfaxAbbey.Demo
{
    public enum Appetite { Insects, Birds, Cats, Blood }

    public record Patient(string Name, string Ward, double Vitality = 100.0);

    public interface ICasebook<T> where T : class
    {
        Task<bool> ObserveAsync(T who);
    }

    public class Casebook : ICasebook<Patient>
    {
        private const int Nights = 50;
        private readonly List<Patient> _patients = new();

        public string? Note { get; init; }

        #region Observation
        /// <summary>
        /// Records a night in the asylum and reports whether the patient still lives.
        /// </summary>
        /// <param name="who">The patient under Dr Seward's care.</param>
        /// <returns><c>true</c> when the observation is complete.</returns>
        public async Task<bool> ObserveAsync(Patient who)
        {
            _patients.Add(who with { Vitality = who.Vitality - 10.5 });
            await Task.Delay(TimeSpan.FromMilliseconds(Nights));
            return who is { Vitality: > 10 } && Note is not null;
        }
        #endregion

        [Obsolete("Use ObserveAsync instead.")]
        public bool Observe(Patient who) => ObserveAsync(who).Result;

        public string Describe(Appetite appetite) => appetite switch
        {
            Appetite.Insects => $"Renfield feeds, {Note ?? "zoophagous"}!",
            Appetite.Blood => @"The blood is the life, see C:\seward\phonograph",
            _ => throw new ArgumentOutOfRangeException(nameof(appetite)),
        };

        public IEnumerable<string> FromPurfleet() =>
            from p in _patients
            where p.Ward == "Purfleet" && p.Vitality >= 10
            orderby p.Vitality descending
            select p.Name.ToUpperInvariant();

        public static void Main()
        {
            var book = new Casebook { Note = "The blood is the life!" };
            var renfield = new Patient("Renfield", "Purfleet");
            // Dr Seward's phonograph diary, 26 September
            Console.WriteLine(book.ObserveAsync(renfield).Result ? '\u271D' : 'x');
            Console.WriteLine(string.Join(", ", book.FromPurfleet()), typeof(Casebook).Name);
        }
    }
}
