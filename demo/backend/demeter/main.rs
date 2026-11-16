//! Carfax Abbey: Rust (source.rust).
//! A log of the schooner Demeter, split over three files:
//! `main.rs` (entry point), `voyage.rs` (types, traits, generics) and `logbook.rs` (macros, async).

mod logbook;
mod voyage;

use std::collections::HashMap;
use std::fmt::Write as _;
use std::future::Future;
use std::pin::pin;
use std::task::{Context, Poll, Waker};

use logbook::{entry, watch_the_hold, Sign};
use voyage::{Entry, Logbook, Sea};

/// Boxes of earth in the hold, shipped from Varna and bound for Whitby.
pub const HOLD_BOXES: f64 = 50.0;
static SHIP: &str = "Demeter";
const MOTTO: &str = r#"Denn die Todten reiten schnell — "the dead travel fast.""#;

#[derive(Debug, Default)]
struct Census<'a> {
    ship: &'a str,
    sightings: HashMap<Sign, u32>,
}

impl<'a> Census<'a> {
    fn new(ship: &'a str) -> Self {
        Self { ship, ..Default::default() }
    }

    fn record(&mut self, sign: Sign) -> &mut Self {
        *self.sightings.entry(sign).or_insert(0) += 1;
        self
    }
}

fn main() -> Result<(), voyage::VoyageError> {
    let log: Logbook<Entry> = "04:12 gale 12\n08:40 calm 11\n16:31 gale 7\n23:58 fog 1"
        .parse()?;

    let mut census = Census::new(SHIP);
    for reading in log.iter().filter(|r| matches!(r.sea, Sea::Gale { .. })) {
        census.record(Sign::from(reading));
    }

    let fewest = log
        .iter()
        .map(|r| r.souls)
        .fold(f64::MAX, f64::min);

    // Poll the lookout once with a no-op waker; the hold answers immediately.
    let mut watcher = pin!(watch_the_hold(&log, 5.0));
    let mut cx = Context::from_waker(Waker::noop());
    let verdict = match watcher.as_mut().poll(&mut cx) {
        Poll::Ready(Ok(sign)) => format!("the lookout sends {sign:?}"),
        Poll::Ready(Err(err)) => format!("the lookout is silent: {err}"),
        Poll::Pending => String::from("still waiting off the Yorkshire coast"),
    };

    let mut report = String::new();
    writeln!(report, "{:<12}|{:>8.0} souls  ({HOLD_BOXES} boxes)", census.ship, fewest).unwrap();
    writeln!(report, "{verdict}; {} kinds of sign, 0x{:04X}", census.sightings.len(), 0x2f_u16).unwrap();
    print!("{report}{}", entry!(MOTTO, times = 2));
    Ok(())
}
