# Carfax Abbey: Ruby
require 'json'

module Carfax
  BOXES = 50
  BILL = /\Aearth\s+(?<port>\w+)/i

  class Crate < Struct.new(:mark, :port)
    include Comparable
    attr_accessor :weight
    attr_reader :tags

    @@count = 2

    def initialize(mark, port = 'Varna', **options)
      super(mark, port)
      @weight = options.fetch(:weight, 100)
      @tags = %i[earth clay]
      @@count += 1
    end

    def self.count
      @@count
    end

    def <=>(other)
      weight <=> other.weight
    end

    def ship(leagues = 8)
      @weight -= leagues * 1.5
      raise ArgumentError, "#{mark} was lost overboard\n" if @weight < 10
      yield self if block_given?
      self
    end

    def to_h
      { mark: mark, port: port, weight: weight, 'boxes' => BOXES }
    end

    private

    def whisper(*words, loud: false)
      text = words.map(&:to_s).join(' ')
      loud ? text.upcase : text
      puts text
    end
  end
end

bill = "earth whitby"
port = bill[Carfax::BILL, :port] || 'nowhere'
crate = Carfax::Crate.new('Box 7', port.capitalize, weight: 60)

crate.ship(4) do |c|
  puts "#{c.mark} bound for #{c.port}, #{Carfax::BOXES} boxes of earth"
end

notes = <<~TEXT
  Crates: #{Carfax::Crate.count}
  Weight: #{crate.weight.round(1)}
TEXT

puts notes, crate.to_h.to_json, [1, 2, 3].select(&:odd?).inspect
puts :galatz, /whitby #{port}/x.source, nil.nil?
